using System.Collections.Generic;
using WebApi.Models;

namespace WebApi.Extenstions
{
    public static class DataConverter
    {
        public static IEnumerable<DbEntity>ConvertToEntity(List<Dictionary<string, string>> items)
        {
            var result = new List<DbEntity>();
            
            foreach(var item in items)
            {
                var key = item.Keys.FirstOrDefault();
                var value = item[key];

                result.Add(new DbEntity
                {
                    Code = int.Parse(key),
                    Value = value
                });
            }
            

            return result;
        }
    }
}
