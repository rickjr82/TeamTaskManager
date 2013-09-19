using System;
using System.Collections.Generic;

namespace MyTeamTracker.Models
{
    public partial class Team
    {
        public Team()
        {
            this.TeamGameTasks = new List<TeamGameTask>();
            this.Players = new List<Player>();
        }

        public string Name { get; set; }
        public int Id { get; set; }
        public virtual ICollection<TeamGameTask> TeamGameTasks { get; set; }
        public virtual ICollection<Player> Players { get; set; }
    }
}
