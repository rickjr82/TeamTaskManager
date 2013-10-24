using System;
using System.Linq;
using System.Web.Security;
using WebMatrix.WebData;

namespace TeamTaskManager.Models
{
    public class MyTeamTrackerDBInitializer
    {
        public MyTeamTrackerDBInitializer()
        {
          //  WebSecurity.InitializeDatabaseConnection("MyTeamTrackerContext", "UserProfile", "UserId", "UserName", autoCreateTables: true);
        }

        public void Seed(MyTeamTrackerContext context)
        {
         //  var validUser =SeedMembership(context);

           //SeedTeams(context, validUser);
           // SeedPlayers(context);
           // SeedTasks(context);
           // SeedGames(context);
            
        }

        public void SeedPlayers(MyTeamTrackerContext context)
        {
        
        }

        public void SeedTasks(MyTeamTrackerContext context)
        {
        
        }

        public void SeedTeams(MyTeamTrackerContext context, UserProfile coach)
        {
        

        }

        public UserProfile SeedMembership(MyTeamTrackerContext context)
        {

            //  WebSecurity.InitializeDatabaseConnection(context.Database.Connection.ConnectionString, "UserProfile", "UserId", "UserName", autoCreateTables: true);
            WebSecurity.InitializeDatabaseConnection("data", "UserProfile", "UserId", "UserName", autoCreateTables: true);

            if (!Roles.RoleExists("Administrator"))
                Roles.CreateRole("Administrator");

            if (!WebSecurity.UserExists("pdriscoll"))
                WebSecurity.CreateUserAndAccount(
                    "pdriscoll",
                    "test1234"
                    );

            if (!WebSecurity.UserExists("rwicker"))
                WebSecurity.CreateUserAndAccount(
                    "rwicker",
                    "test1234"
                    );
            if (!WebSecurity.UserExists("test"))
                WebSecurity.CreateUserAndAccount(
                    "test",
                    "testtest"
                    );
            if (!Roles.GetRolesForUser("pdriscoll").Contains("Administrator"))
                Roles.AddUsersToRoles(new[] { "pdriscoll" }, new[] { "Administrator" });

            if (!Roles.GetRolesForUser("rwicker").Contains("Administrator"))
                Roles.AddUsersToRoles(new[] { "rwicker" }, new[] { "Administrator" });
            var userId=WebSecurity.GetUserId("test");
            return context.UserProfiles.Single(x => x.UserId == userId);
        }

        public void SeedGames(MyTeamTrackerContext context)
        {
          
        }
    }
}

