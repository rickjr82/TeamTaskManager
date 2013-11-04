using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace TeamTaskManager.Models.Mapping
{
    public class UserSettingMap : EntityTypeConfiguration<UserSetting>
    {
        public UserSettingMap()
        {
            // Primary Key
            this.HasKey(x => x.UserId).HasKey(x => x.SettingName);
            this.HasRequired(x => x.UserProfile)
                .WithMany(x => x.UserSettings);
        }
    }
}