using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace TeamTaskManager.Models.Mapping
{
    public class GameMap : EntityTypeConfiguration<Game>
    {
        public GameMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Location)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Opponent)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Game");
            this.Property(t => t.Time).HasColumnName("Time");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Location).HasColumnName("Location");
            this.Property(t => t.Opponent).HasColumnName("Opponent");

            // Relationships         
            this.HasRequired(t => t.Team)                
                .HasForeignKey(d => d.TeamId);
        }
    }
}
