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
            this.Property(t => t.TeamId).HasColumnName("TeamId");

            // Relationships
            this.HasRequired(t => t.Team)
                .WithMany(t => t.Games)
                .HasForeignKey(d => d.TeamId);

        }
    }
}
