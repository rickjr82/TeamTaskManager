using System;
using System.Collections.Generic;

namespace TeamTaskManager.Models
{
    public partial class Player
    {
        public Player()
        {
          
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Id { get; set; }
        public int TeamId { get; set; }
        public virtual Team Team { get; set; }
        public virtual UserProfile User { get; set; }
        public int? UserId { get; set; }
        public virtual List<TaskAssignment> TaskAssignments { get; set; }
        
    }
}
