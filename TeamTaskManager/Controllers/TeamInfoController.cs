using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using TeamTaskManager.Filters;
using System.Net.Http;
using System.Web.Http;
using TeamTaskManager.Models;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;
using WebMatrix.WebData;

namespace TeamTaskManager.Controllers
{
    [Authorize]
    [BreezeController]
    public class TeamInfoController : ApiController
    {
        static DateTime _lastRefresh = DateTime.Now; // will first clear db at Now + "RefreshRate" 
        // static DateTime lastRefresh = DateTime.MinValue; // will clear when server starts

        readonly EFContextProvider<MyTeamTrackerContext> _contextProvider =
            new EFContextProvider<MyTeamTrackerContext>();


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
           return _contextProvider.Context.Teams;
        }
        [HttpGet]
        public IQueryable<Player> Players()
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var user = context.UserProfiles.Single(x => x.UserId == userId);
            var players = context.Players.Where(x => x.UserId == userId);
            return players;
        }
        [HttpGet]
        public IQueryable<Task> Tasks()
        {
            return _contextProvider.Context.Tasks;
        }
        [HttpGet]
        public IQueryable<Game> Games()
        {
            return _contextProvider.Context.Games;
        }
        [HttpGet]
        public IQueryable<TaskAssignment> TaskAssignments()
        {
            return _contextProvider.Context.TaskAssignments;
        }
        [HttpGet]
        public int? GetCurrentPlayer()
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var player = context.Players.SingleOrDefault(x => x.UserId == userId);
            if (player != null)
                return player.Id;
            else
                return null;
        }
        [HttpPut]
        public void SetCurrentPlayer(int playerId)
        { 
            var context= _contextProvider.Context;
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
        [ValidateHttpAntiForgeryToken]
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
        [ValidateHttpAntiForgeryToken]
        public void DeleteTeamFromCurrentUser(int teamId)
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var team = context.Teams.Single(x => x.Id == teamId);
            var user = context.UserProfiles.Single(x => x.UserId == userId);
            user.Teams.Remove(team);
            context.SaveChanges();
        }
        [HttpPost]
        [ValidateHttpAntiForgeryToken]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }
        [HttpGet]
        public IQueryable<Player> CurrentUserPlayers()
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var players = context.Players.Where(x=>x.UserId==userId);
            return players;

        }
        [HttpGet]
        public ICollection<Team> CurrentUserTeams()
        {
            var context = _contextProvider.Context;
            var userId = WebSecurity.GetUserId(User.Identity.Name);
            var user = context.UserProfiles.Include("Teams").Single(x => x.UserId == userId);
            var teams = user.Teams;
            return teams;
        }
    }
}
