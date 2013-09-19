using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MyTeamTracker.Models.Mapping
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
            this.Property(t => t.FirstName).HasColumnName("FirstName");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.Id).HasColumnName("Id");

            // Relationships
            this.HasMany(t => t.Teams)
                .WithMany(t => t.Players)
                .Map(m =>
                    {
                        m.ToTable("TeamPlayers");
                        m.MapLeftKey("PlayerId");
                        m.MapRightKey("TeamId");
                    });


        }
    }
}
