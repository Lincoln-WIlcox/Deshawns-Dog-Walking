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

List<Dog> dogs = new List<Dog>
{
    new Dog
    {
        Id = 1,
        Name = "Bailey",
        WalkerId = 1,
        CityId = 1
    },
    new Dog
    {
        Id = 2,
        Name = "Max",
        WalkerId = 2,
        CityId = 2
    }
};

app.MapGet(
    "/api/dogs",
    () =>
    {
        return dogs.Select(
            (dog) =>
                new DogDTO
                {
                    Id = dog.Id,
                    Name = dog.Name,
                    WalkerId = dog.WalkerId,
                    CityId = dog.CityId
                }
        );
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
