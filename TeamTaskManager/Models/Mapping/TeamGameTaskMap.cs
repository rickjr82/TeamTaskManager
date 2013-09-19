using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MyTeamTracker.Models.Mapping
{
    public class TeamGameTaskMap : EntityTypeConfiguration<TeamGameTask>
    {
        public TeamGameTaskMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TeamId, t.TaskId, t.GameId, t.PlayerId });

            // Properties
            this.Property(t => t.TeamId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.TaskId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.GameId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PlayerId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("TeamGameTasks");
            this.Property(t => t.TeamId).HasColumnName("TeamId");
            this.Property(t => t.TaskId).HasColumnName("TaskId");
            this.Property(t => t.GameId).HasColumnName("GameId");
            this.Property(t => t.PlayerId).HasColumnName("PlayerId");
            this.Property(t => t.AcceptedTime).HasColumnName("AcceptedTime");

            // Relationships
            this.HasRequired(t => t.Game)
                .WithMany(t => t.TeamGameTasks)
                .HasForeignKey(d => d.GameId);
            this.HasRequired(t => t.Player)
                .WithMany(t => t.TeamGameTasks)
                .HasForeignKey(d => d.PlayerId);
            this.HasRequired(t => t.Task)
                .WithMany(t => t.TeamGameTasks)
                .HasForeignKey(d => d.TaskId);
            this.HasRequired(t => t.Team)
                .WithMany(t => t.TeamGameTasks)
                .HasForeignKey(d => d.TeamId);

        }
    }
}
