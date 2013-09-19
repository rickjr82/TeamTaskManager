using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using MyTeamTracker.Models.Mapping;

namespace MyTeamTracker.Models
{
    public partial class MyTeamTrackerContext : DbContext
    {
        static MyTeamTrackerContext()
        {
            Database.SetInitializer<MyTeamTrackerContext>(null);
        }

        public MyTeamTrackerContext()
            : base("Name=MyTeamTrackerContext")
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamGameTask> TeamGameTasks { get; set; }
        public DbSet<TeamTask> TeamTasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new GameMap());
            modelBuilder.Configurations.Add(new PlayerMap());
            modelBuilder.Configurations.Add(new TaskMap());
            modelBuilder.Configurations.Add(new TeamMap());
            modelBuilder.Configurations.Add(new TeamGameTaskMap());
            modelBuilder.Configurations.Add(new TeamTaskMap());
        }
    }
}
