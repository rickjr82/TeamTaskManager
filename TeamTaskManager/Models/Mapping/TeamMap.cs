using System.Data.Entity.ModelConfiguration;
using DotNetOpenAuth.AspNet.Clients;
using Microsoft.Ajax.Utilities;

namespace TeamTaskManager.Models.Mapping
{
    public class TeamMap : EntityTypeConfiguration<Team>
    {
        public TeamMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.HasMany(x => x.Parents)
                .WithMany(x => x.Teams)
                .Map(x =>
                {
                    x.MapLeftKey("TeamId");
                    x.MapRightKey("UserId");
                    x.ToTable("ParentTeams");
                }

                );
            this.HasRequired(x => x.Coach).WithMany(x => x.TeamsCoached).HasForeignKey(x => x.CoachId).WillCascadeOnDelete(false);
        }
    }
}
