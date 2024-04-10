var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet(
    "/api/hello",
    () =>
    {
        return new { Message = "Welcome to DeShawn's Dog Walking" };
    }
);

app.MapGet(
    "/api/walkers",
    () =>
    {
        return new { Message = "Walkers" };
    }
);

app.MapGet(
    "/api/cities",
    () =>
    {
        return new { Message = "Cities" };
    }
);

app.Run();
