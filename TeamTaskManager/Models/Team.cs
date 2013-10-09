using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace TeamTaskManager.Models
{
    public partial class Team
    {
        public Team()
        {
            this.Games = new List<Game>();
            this.Players = new List<Player>();
        }

        public string Name { get; set; }
        [Key]
        public int Id { get; set; }
        public virtual ICollection<Game> Games { get; set; }
        public virtual ICollection<Player> Players { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<UserProfile> UserProfiles { get; set; }
    }
}
