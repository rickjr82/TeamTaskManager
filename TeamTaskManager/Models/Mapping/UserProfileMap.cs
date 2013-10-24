using System.Data.Entity.ModelConfiguration;

namespace TeamTaskManager.Models.Mapping
{
    public class UserProfileMap : EntityTypeConfiguration<UserProfile>
    {
        public UserProfileMap()
        {
            // Primary Key
            this.HasKey(t => t.UserId);
            this.HasMany(x => x.Teams)
                .WithMany(x => x.Parents)
                .Map(x =>
                {
                    x.MapLeftKey("TeamId");
                    x.MapRightKey("UserId");
                    x.ToTable("ParentTeams");
                });           
        }
    }
}