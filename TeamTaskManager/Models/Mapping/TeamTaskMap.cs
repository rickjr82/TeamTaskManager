using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MyTeamTracker.Models.Mapping
{
    public class TeamTaskMap : EntityTypeConfiguration<TeamTask>
    {
        public TeamTaskMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TeamId, t.TaskId });

            // Properties
            this.Property(t => t.TeamId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.TaskId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("TeamTasks");
            this.Property(t => t.TeamId).HasColumnName("TeamId");
            this.Property(t => t.TaskId).HasColumnName("TaskId");
        }
    }
}
