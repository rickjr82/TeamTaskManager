using System.Data.Entity;
using TeamTaskManager.Models.Mapping;

namespace TeamTaskManager.Models
{
    public partial class MyTeamTrackerContext : DbContext
    {
        static MyTeamTrackerContext()
        {
            Database.SetInitializer<MyTeamTrackerContext>(null);
        }

        public MyTeamTrackerContext()
            : base("Name=context")
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TaskAssignment> TaskAssignments { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<UserSetting> UserSettings { get; set; }
       
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new GameMap());
            modelBuilder.Configurations.Add(new PlayerMap());
            modelBuilder.Configurations.Add(new TaskMap());
            modelBuilder.Configurations.Add(new TeamMap());
            modelBuilder.Configurations.Add(new TaskAssignmentMap());
            modelBuilder.Configurations.Add(new UserProfileMap());
            modelBuilder.Configurations.Add(new UserSettingMap());
       }
    }
}
