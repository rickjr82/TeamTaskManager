using System.Data.Entity.ModelConfiguration;

namespace TeamTaskManager.Models.Mapping
{
    public class PlayerMap : EntityTypeConfiguration<Player>
    {
        public PlayerMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LastName)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Player");
          

            // Relationships
            // Relationships
            this.HasRequired(t => t.Team)
                .WithMany(t => t.Players)
                .HasForeignKey(d => d.TeamId);        
        }
    }
}
