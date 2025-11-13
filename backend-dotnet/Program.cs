using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// 🔹 CORS – odpowiednik express().use(cors({...}))
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// 🔹 Kontrolery (odpowiednik app.use('/api/...'))
builder.Services.AddControllers();

// 🔹 Database (PostgreSQL)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🔹 Swagger (dla testów API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🔹 Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");
app.UseHttpsRedirection();

app.UseAuthorization();

// 🔹 Rejestrowanie tras API
app.MapControllers();

// 🔹 Odpowiednik app.listen(3000, '0.0.0.0')
app.Urls.Add("http://0.0.0.0:5288");

app.Run();
