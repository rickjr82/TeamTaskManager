using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace TeamTaskManager.Models
{
    public partial class Team
    {
        public Team()
        {
            this.Games = new HashSet<Game>();
            this.Players = new HashSet<Player>();
            this.Tasks = new HashSet<Task>();
            this.Parents = new HashSet<UserProfile>();
        }

        public string Name { get; set; }
        [Key]
        public int Id { get; set; }

        public int CoachId { get; set; }
        public UserProfile Coach { get; set; }
        public virtual ICollection<Game> Games { get; set; }
        public virtual ICollection<Player> Players { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<UserProfile> Parents { get; set; }
    }
}
