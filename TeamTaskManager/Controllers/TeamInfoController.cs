using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using TeamTaskManager.Filters;
using System.Web.Http;
using TeamTaskManager.Models;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;
using WebMatrix.WebData;
using System.Web.Security;

namespace TeamTaskManager.Controllers
{
    [Authorize]
    public class MyTeamTrackerContextProvider : EFContextProvider<MyTeamTrackerContext>
    {
        private readonly int _currentUserId;

        public MyTeamTrackerContextProvider(int userId)
            : base()
        {
            _currentUserId = userId;

        }
        protected override bool BeforeSaveEntity(EntityInfo entityInfo)
        {
            // return false if we don’t want the entity saved.
            // prohibit any additions of entities of type 'Role'
            if (entityInfo.Entity.GetType() == typeof(Team)
              && entityInfo.EntityState == EntityState.Added)
            {
                ((Team)entityInfo.Entity).CoachId = _currentUserId;
            }
            return true;
        }

        protected override Dictionary<Type, List<EntityInfo>> BeforeSaveEntities(Dictionary<Type, List<EntityInfo>> saveMap)
        {
            // return a map of those entities we want saved.
            return saveMap;
        }
    }

    public class VmTaskAssignment
    {
        public VmTaskAssignment(TaskAssignment ta)
        {
            TaskId = ta.TaskId;
            GameId = ta.GameId;
            PlayerId = ta.PlayerId;
            if (ta.PlayerId == 0)
            {
                DisplayName = "Open";
            }
            else
            {
                DisplayName = ta.Player.FirstName + " " + ta.Player.LastName;
            }
            if (ta.Game != null)
            {
                GameTime = ta.Game.Time;
                GameLocation = ta.Game.Location;
            }
            if (ta.Task != null)
            {
                TaskName = ta.Task.Name;
                TaskDescription = ta.Task.Description;
            }
            
            
        }

        public int TaskId;
        public int GameId;
        public int PlayerId;
        public DateTime GameTime;
        public string GameLocation;
        public string TaskName;
        public string TaskDescription;
        public string DisplayName;        
    }
    public class VmTeam
    {
        public VmTeam(Team team)
        {
            Id = team.Id;
            Name = team.Name;
        }

        public int Id;
        public string Name;
    }
    public class VmPlayer
    {
        public VmPlayer(Player player)
        {
            Id = player.Id;
            FirstName = player.FirstName;
            LastName = player.LastName;
        }

        public int Id;
        public string FirstName;
        public string LastName;
    }
    [Authorize]
    public class TeamInfoController : ApiController
    {
        static DateTime _lastRefresh = DateTime.Now; // will first clear db at Now + "RefreshRate" 
        // static DateTime lastRefresh = DateTime.MinValue; // will clear when server starts

        private readonly MyTeamTrackerContextProvider _contextProvider;

        public TeamInfoController()
        {
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            _contextProvider = new MyTeamTrackerContextProvider(userId);
        }

        [HttpGet]
        public List<VmPlayer> CurrentUserPlayers(int teamId, bool inCoachMode)
        {
            var context = _contextProvider.Context;

            var players = context.Players;
            if (inCoachMode)
            {
                return players.Where(x => x.TeamId == teamId).ToList().Select(x => new VmPlayer(x)).ToList();
            }
            else
            {
                var userId = WebSecurity.GetUserId(User.Identity.Name);
                return players.Where(x => x.UserId == userId && x.TeamId == teamId).ToList().Select(x => new VmPlayer(x)).ToList();
            }
        }
        [HttpGet]
        public int GetCurrentUserId()
        {
            return WebSecurity.GetUserId(User.Identity.Name);
        }
        [HttpGet]
        public List<VmTeam> CurrentUserTeams(bool inCoachMode)
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var teams = _contextProvider.Context.Teams;
            if (inCoachMode)
            {
                return teams.Where(x => x.CoachId == userId).ToList().Select(x => new VmTeam(x)).ToList();
            }
            else
            {
                return teams.Where(x => x.Parents.Any(y => y.UserId == userId)).ToList().Select(x => new VmTeam(x)).ToList();
            }
        }
        [HttpGet]
        public List<VmTaskAssignment> CurrentUserAssignments()
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var taskAssignmentsFilled = context.TaskAssignments.Include(x => x.Player).Include(x => x.Task).Include(x => x.Game).Where(x => x.Player.UserId == userId).ToList();

            return taskAssignmentsFilled.Select(x => new VmTaskAssignment(x)).ToList();
        }
        [HttpGet]
        public List<VmTaskAssignment> GetTaskAssignments(int teamId)
        {
            var context = _contextProvider.Context;
            var team = context.Teams.Include(x => x.Tasks).Include(x => x.Games).Single(x => x.Id == teamId);
            var taskAssignmentsFilled = context.TaskAssignments.Where(x => x.Task.TeamId == teamId).Include(x => x.Player).ToList();
            List<TaskAssignment> taskAssignments = new List<TaskAssignment>();
            foreach (var task in team.Tasks)
            {
                foreach (var game in team.Games)
                {
                    var taskAssignment =
                        taskAssignmentsFilled.SingleOrDefault(x => x.GameId == game.Id && x.TaskId == task.Id);
                    if (taskAssignment == null)
                    {
                        taskAssignment = new TaskAssignment { GameId = game.Id, TaskId = task.Id, PlayerId = 0, Game = game, Task = task};
                    }
                    taskAssignments.Add(taskAssignment);
                }
            }
            return taskAssignments.ToList().Select(x => new VmTaskAssignment(x)).ToList();
        }
        [HttpGet]
        public int GetCurrentUser()
        {
            return WebSecurity.GetUserId(User.Identity.Name);
        }
        [HttpPut]
        public void SetCurrentPlayer(int playerId)
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var player = context.Players.Single(x => x.Id == playerId);
            player.UserId = userId;
            context.SaveChanges();
        }
        [HttpGet]
        public void AddPlayerToCurrentUser(int playerId)
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var player = context.Players.Single(x => x.Id == playerId);
            player.UserId = userId;
            context.SaveChanges();
        }
        [HttpDelete]
        public void DeletePlayerFromCurrentUser(int playerId)
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var player = context.Players.Single(x => x.Id == playerId);
            var user = context.UserProfiles.Single(x => x.UserId == userId);
            user.Players.Remove(player);
            context.SaveChanges();
        }
        [HttpGet]
        public void AddTeamToCurrentUser(int teamId)
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var team = context.Teams.Single(x => x.Id == teamId);
            var user = context.UserProfiles.Single(x => x.UserId == userId);
            user.Teams.Add(team);
            context.SaveChanges();
        }
        [HttpDelete]
        public void DeleteTeamFromCurrentUser(int teamId)
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var team = context.Teams.Single(x => x.Id == teamId);
            var user = context.UserProfiles.Single(x => x.UserId == userId);
            user.Teams.Remove(team);
            context.SaveChanges();
        }
        [HttpGet]
        public object ToggleTaskForCurrentPlayer(int gameId, int taskId, int playerId)
        {
            var context = _contextProvider.Context;

            var player = context.Players.SingleOrDefault(x => x.Id == playerId);
            var taskAssignment = context.TaskAssignments.Include(x => x.Player).SingleOrDefault(x => x.GameId == gameId && x.TaskId == taskId);
            if (taskAssignment == null && player != null)
            {
                taskAssignment = new TaskAssignment { GameId = gameId, PlayerId = player.Id, TaskId = taskId };
                context.TaskAssignments.Add(taskAssignment);
            }
            else
            {
                context.TaskAssignments.Remove(taskAssignment);
                if (player != null && player.Id != taskAssignment.PlayerId)
                {
                    taskAssignment = new TaskAssignment { GameId = gameId, TaskId = taskId, PlayerId = player.Id, Player = player }; ;
                    context.TaskAssignments.Add(taskAssignment);
                }
                else
                {
                    taskAssignment = new TaskAssignment { GameId = gameId, TaskId = taskId, PlayerId = 0 }; ;
                }

            }
            context.SaveChanges();
            return new VmTaskAssignment(taskAssignment);
        }
        [HttpGet]
        public object GetCurrentUserDetails()
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var teams = context.Teams.Where(x => x.Parents.Any(y => y.UserId == userId)).ToList().Select(x => new VmTeam(x)).ToList();
            var players = context.Players.Where(x => x.UserId == userId).ToList().Select(x => new VmPlayer(x)).ToList();
            return new
            {
                teams = teams,
                players = players
            };
        }
    }
    [Authorize]
    [BreezeController]
    public class TeamInfoBreezeController : ApiController
    {
        static DateTime _lastRefresh = DateTime.Now; // will first clear db at Now + "RefreshRate" 
        // static DateTime lastRefresh = DateTime.MinValue; // will clear when server starts

        private readonly MyTeamTrackerContextProvider _contextProvider;

        public TeamInfoBreezeController()
        {
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            _contextProvider = new MyTeamTrackerContextProvider(userId);

        }

        // ~/breeze/todos/Metadata 
        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        // ~/breeze/todos/Todos
        // ~/breeze/todos/Todos?$filter=IsArchived eq false&$orderby=CreatedAt 
        [HttpGet]
        public IQueryable<Team> Teams()
        {
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            return _contextProvider.Context.Teams;
        }
        [HttpGet]
        public IQueryable<Player> Players()
        {
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var context = _contextProvider.Context;
            var players = context.Players;
            return players;
        }
        [HttpGet]
        public IQueryable<Task> Tasks()
        {
            var context = _contextProvider.Context;
            var tasks = context.Tasks;
            return tasks;
        }
        [HttpGet]
        public IQueryable<Game> Games()
        {
            var context = _contextProvider.Context;
            var games = context.Games;
            return games;
        }

        [HttpGet]
        public IQueryable<UserProfile> Users()
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var player = context.Players.SingleOrDefault(x => x.UserId == userId);
            bool isAdmin = Roles.GetRolesForUser().Contains("Administrator");
            var users = context.UserProfiles.Where(x => x.UserId == userId || isAdmin);
            return users;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

    }
}
