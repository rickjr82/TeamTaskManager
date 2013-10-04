namespace TeamTaskManager.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Collections;
    using TeamTaskManager.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<TeamTaskManager.Models.MyTeamTrackerContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(TeamTaskManager.Models.MyTeamTrackerContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //

            // added initializer for local testing
            var initializer = new MyTeamTrackerDBInitializer();
            initializer.Seed(context);
        }
    }
}
