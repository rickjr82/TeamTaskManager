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
            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("Game");
            this.Property(t => t.Time).HasColumnName("Time");
            this.Property(t => t.Team1Id).HasColumnName("Team1Id");
            this.Property(t => t.Team2Id).HasColumnName("Team2Id");
            this.Property(t => t.Id).HasColumnName("Id");
        }
    }
}
