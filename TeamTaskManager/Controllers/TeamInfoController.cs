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
            return _contextProvider.Context.Players;
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


        [HttpPost]
        [ValidateHttpAntiForgeryToken]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

    }
}
