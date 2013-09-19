using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyTeamTracker.Models;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace TeamTaskManager.Controllers
{
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
        public IQueryable<Player> Players()
        {
            return _contextProvider.Context.Players;
        }

        // ~/breeze/todos/SaveChanges
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

    }
}
