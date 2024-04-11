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

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "walker 1" },
    new Walker { Id = 2, Name = "walker 2" },
    new Walker { Id = 3, Name = "walker 3" }
};

List<City> cities = new List<City>
{
    new City { Id = 1, Name = "walker 1" },
    new City { Id = 2, Name = "walker 2" }
};

List<CityWalker> cityWalkers = new List<CityWalker>
{
    new CityWalker
    {
        Id = 1,
        WalkerId = 1,
        CityId = 1,
    },
    new CityWalker
    {
        Id = 1,
        WalkerId = 2,
        CityId = 2,
    },
    new CityWalker
    {
        Id = 1,
        WalkerId = 1,
        CityId = 2,
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

app.MapPost(
    "/api/dogs",
    (Dog dog) =>
    {
        Walker walker = walkers.FirstOrDefault(walker => walker.Id == dog.WalkerId);
        City city = cities.FirstOrDefault(city => city.Id == dog.CityId);

        if (walker == null || city == null)
        {
            return Results.BadRequest();
        }

        if (dogs.Count > 0)
        {
            dog.Id = dogs.Max(dog => dog.Id) + 1;
        }
        else
        {
            dog.Id = 1;
        }

        dogs.Add(dog);

        return Results.Created(
            $"/api/dogs/{dog.Id}",
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

app.Run();
