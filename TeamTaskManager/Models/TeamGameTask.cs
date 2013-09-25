using System;
using System.Collections.Generic;

namespace TeamTaskManager.Models
{
    public partial class TeamGameTask
    {
        public int TaskId { get; set; }
        public int GameId { get; set; }
        public int PlayerId { get; set; }
        public System.DateTime AcceptedTime { get; set; }
        public virtual Game Game { get; set; }
        public virtual Player Player { get; set; }
        public virtual Task Task { get; set; }
    }
}
