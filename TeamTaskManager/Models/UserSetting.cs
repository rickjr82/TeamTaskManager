using System.ComponentModel.DataAnnotations;

namespace TeamTaskManager.Models
{
    public class UserSetting
    {
        [Key]
        public int UserId { get; set; }        
        public UserProfile UserProfile { get; set; }
        [Key]
        public string SettingName { get; set; }
        public string SettingValue { get; set; }
    }
}