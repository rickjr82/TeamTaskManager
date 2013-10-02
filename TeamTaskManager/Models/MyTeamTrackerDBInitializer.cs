using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
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
            SeedTeams(context);
            SeedPlayers(context);
            SeedTasks(context);

            SeedGames(context);
            SeedMembership(context);
        }

        public void SeedPlayers(MyTeamTrackerContext context)
        {
            if (context.Players.Any()) return;

            context.Players.Add(new Player { FirstName = "Player", LastName = "A" });

            context.Players.Add(new Player { FirstName = "Player", LastName = "B" });

            context.Players.Add(new Player { FirstName = "Player", LastName = "C" });

            context.SaveChanges();

        }

        public void SeedTasks(MyTeamTrackerContext context)
        {

        }

        public void SeedTeams(MyTeamTrackerContext context)
        {
            if (context.Teams.Any()) return;

            context.Teams.Add(new Team { Name = "The Boogaloogas" });

            context.Teams.Add(new Team { Name = "The Screaming Ninnies" });

            context.Teams.Add(new Team { Name = "The Arthropods" });

            context.SaveChanges();

        }

        public void SeedMembership(MyTeamTrackerContext context)
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

            if (!Roles.GetRolesForUser("pdriscoll").Contains("Administrator"))
                Roles.AddUsersToRoles(new[] { "pdriscoll" }, new[] { "Administrator" });

            if (!Roles.GetRolesForUser("rwicker").Contains("Administrator"))
                Roles.AddUsersToRoles(new[] { "rwicker" }, new[] { "Administrator" });
        }

        public void SeedGames(MyTeamTrackerContext context)
        {

        }
    }
}

