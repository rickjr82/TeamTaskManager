﻿using System;
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
            if (context.Players.Any()) return;

            var firstUser = context.UserProfiles.First();

            context.Players.Add(new Player { FirstName = "Player", LastName = "A", User = firstUser });

            context.Players.Add(new Player { FirstName = "Player", LastName = "B", User = firstUser });

            context.Players.Add(new Player { FirstName = "Player", LastName = "C", User = firstUser });

            context.SaveChanges();

        }

        public void SeedTasks(MyTeamTrackerContext context)
        {
            if (context.Tasks.Any()) return;

            var firstTeam = context.Teams.First();

            context.Tasks.Add(new Task { Name = "Task A", Description = "Task A Description", Team = firstTeam });
            context.SaveChanges();
        }

        public void SeedTeams(MyTeamTrackerContext context, UserProfile coach)
        {
            if (context.Teams.Any()) return;

            var firstUser = context.UserProfiles.First();

            context.Teams.Add(new Team { Name = "The Boogaloogas", Coach = coach });

            context.Teams.Add(new Team { Name = "The Screaming Ninnies", Coach = coach });

            context.Teams.Add(new Team { Name = "The Arthropods", Coach = coach });

            context.SaveChanges();

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
            if (context.Games.Any()) return;

            var firstUser = context.UserProfiles.First();
            var firstTeam = context.Teams.First();

            context.Games.Add(new Game { Location = "Some Town", Opponent = "The Other Team", Team = firstTeam, Time = DateTime.Now.AddDays(7) });
            context.Games.Add(new Game { Location = "Big Town", Opponent = "The Big Fizzles", Team = firstTeam, Time = DateTime.Now.AddDays(14) });
            context.Games.Add(new Game { Location = "Scary Town", Opponent = "The Crepe Papers", Team = firstTeam, Time = DateTime.Now.AddDays(21) });
            context.SaveChanges();
        }
    }
}

