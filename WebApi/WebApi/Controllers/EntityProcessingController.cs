using Microsoft.AspNetCore.Mvc;
using WebApi.Extrenstions;
using WebApi.MiddleWare;
using WebApi.Models;
using System.Text.Json;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EntityProcessingController : ControllerBase
    {
        private readonly Context _context;
        private readonly ILogger<EntityProcessingController> _logger;

        public EntityProcessingController(ILogger<EntityProcessingController> logger, Context context)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Posts array of entities
        /// </summary>
        /// <param name="json"></param>
        /// <remarks>
        /// ## Example: 
        /// 
        ///     POST /PostEntityArray
        ///     {
        ///         "Code": 1123,
        ///         "Value": "asdasdasd1123"
        ///     }
        /// 
        /// </remarks>
        [HttpPost(Name = "PostEntityArray")]
        public async Task<IActionResult> PostAsync([FromBody] IEnumerable<DbEntity> json)
        {
            if (json == null) 
            {
                return BadRequest("Zero entities passed");
            }

            await _context.Database.EnsureDeletedAsync();
            await _context.Database.EnsureCreatedAsync();

            var entities = json.OrderBy(j => j.Code);

            await _context.dbEntities.AddRangeAsync(entities);
            await _context.SaveChangesAsync();

            return Ok($"{entities.Count()} entities was saved");
        }

        /// <summary>
        /// Returns a JSON array of all entities
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "GetEntities")]
        public async Task<JsonResult> GetAsync([FromQuery]EntityParameters parameters)
        {
            await _context.Database.EnsureCreatedAsync();
            PagedList<DbEntity> result = PagedList<DbEntity>.ToPagedList(_context
                .dbEntities.OrderBy(e => e.Code), parameters.PageNumber, parameters.PageSize);

            var meta = new
            {
                result.TotalCount,
                result.PageSize,
                result.CurrentPage,
                result.TotalPages,
                result.HasNext,
                result.HasPrevious
            };

            Response.Headers.Append("X-Pagination", JsonSerializer.Serialize(meta));

            return new JsonResult(result);
        }

    }
}
