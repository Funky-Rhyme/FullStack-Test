using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApi.Models
{
    public class DbEntity
    {
        [JsonIgnore]
        public int Id { get; set; }
        public int Code { get; set; }
        public string Value {  get; set; } = string.Empty;
    }
}
