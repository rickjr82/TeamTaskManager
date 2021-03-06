using System.Data.Entity.ModelConfiguration;

namespace TeamTaskManager.Models.Mapping
{
    public class TaskMap : EntityTypeConfiguration<Task>
    {
        public TaskMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Description)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("Task");
       
            // Relationships
            this.HasRequired(t => t.Team)
                .WithMany(t => t.Tasks)
                .HasForeignKey(d => d.TeamId);
        }
    }
}
