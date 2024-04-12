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
    new City { Id = 1, Name = "city 1" },
    new City { Id = 2, Name = "city 2" }
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
        Id = 2,
        WalkerId = 2,
        CityId = 2,
    },
    new CityWalker
    {
        Id = 3,
        WalkerId = 3,
        CityId = 2,
    }
};

app.MapGet(
    "/api/dogs",
    () =>
    {
        return dogs.Select(
            (dog) =>
            {
                City city = cities.FirstOrDefault(city => city.Id == dog.CityId);
                Walker walker = walkers.FirstOrDefault(walker => walker.Id == dog.WalkerId);
                return new DogDTO
                {
                    Id = dog.Id,
                    Name = dog.Name,
                    WalkerId = dog.WalkerId,
                    CityId = dog.CityId,
                    City = new CityDTO { Id = city.Id, Name = city.Name },
                    Walker =
                        walker != null ? new WalkerDTO { Id = walker.Id, Name = walker.Name } : null
                };
            }
        );
    }
);

app.MapGet(
    "/api/walkers",
    (int? cityId) =>
    {
        List<Walker> returnWalkers = walkers;

        if (cityId != null)
        {
            City city = cities.FirstOrDefault(city => city.Id == cityId);
            if (city == null)
            {
                return Results.BadRequest();
            }

            returnWalkers = cityWalkers
                .Where(cityWalker => cityWalker.CityId == cityId)
                .Select(cityWalker =>
                    walkers.FirstOrDefault(walker => walker.Id == cityWalker.WalkerId)
                )
                .Distinct()
                .ToList();
        }

        return Results.Ok(
            returnWalkers.Select(walker =>
            {
                List<City> citiesForWalker = cityWalkers
                    .Where(cityWalker => cityWalker.WalkerId == walker.Id)
                    .Select(cityWalker =>
                        cities.FirstOrDefault(city => city.Id == cityWalker.CityId)
                    )
                    .ToList();
                return new WalkerDTO
                {
                    Id = walker.Id,
                    Name = walker.Name,
                    Cities = citiesForWalker
                        .Select(city => new CityDTO { Id = city.Id, Name = city.Name })
                        .ToList()
                };
            })
        );
    }
);

app.MapGet(
    "/api/cities",
    (int? walkerId) =>
    {
        List<City> returnCities = cities;
        if (walkerId != null)
        {
            returnCities = cityWalkers
                .Where(cityWalker => cityWalker.WalkerId == walkerId)
                .Select(cityWalker =>
                    returnCities.FirstOrDefault(city => city.Id == cityWalker.CityId)
                )
                .ToList();
        }
        return returnCities.Select(city => new CityDTO { Id = city.Id, Name = city.Name });
    }
);

app.MapGet(
    "/api/cityWalkers",
    () =>
    {
        return cityWalkers.Select(cityWalker => new CityWalkerDTO
        {
            Id = cityWalker.Id,
            CityId = cityWalker.CityId,
            WalkerId = cityWalker.WalkerId
        });
    }
);

app.MapPost(
    "/api/dogs",
    (Dog dog) =>
    {
        City city = cities.FirstOrDefault(city => city.Id == dog.CityId);

        if (city == null)
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

app.MapPost(
    "/api/cities",
    (City city) =>
    {
        if (cities.Count > 0)
        {
            city.Id = cities.Max(dog => dog.Id) + 1;
        }
        else
        {
            city.Id = 1;
        }

        cities.Add(city);

        return Results.Created(
            $"/api/cities/{city.Id}",
            new CityDTO { Id = city.Id, Name = city.Name }
        );
    }
);

app.MapPut(
    "/api/dogs/{id}",
    (Dog dog, int id) =>
    {
        Walker walker = walkers.FirstOrDefault(walker => walker.Id == dog.WalkerId);

        if (walker == null)
        {
            return Results.BadRequest();
        }

        Dog oldDog = dogs.FirstOrDefault(oldDog => oldDog.Id == id);

        if (oldDog != null)
        {
            dogs.Remove(oldDog);
        }
        dogs.Add(dog);

        dog.Id = id;

        return Results.Ok();
    }
);

app.MapPut(
    "/api/walkers/{id}",
    (Walker walker, int id) =>
    {
        Walker existingWalker = walkers.FirstOrDefault(walker => walker.Id == id);

        walkers.Remove(existingWalker);
        walkers.Add(walker);

        walker.Id = id;

        cityWalkers = cityWalkers.Where(cityWalker => cityWalker.WalkerId != walker.Id).ToList();
        foreach (City city in walker.Cities)
        {
            CityWalker newWC = new CityWalker
            {
                Id = cityWalkers.Count > 0 ? cityWalkers.Max(wc => wc.Id) + 1 : 1,
                WalkerId = id,
                CityId = city.Id
            };
            cityWalkers.Add(newWC);
        }

        return Results.Ok();
    }
);

app.MapDelete(
    "/api/dogs/{id}",
    (int id) =>
    {
        Dog dog = dogs.FirstOrDefault(dog => dog.Id == id);

        if (dog == null)
        {
            return Results.BadRequest();
        }

        dogs.Remove(dog);

        return Results.Ok();
    }
);

app.MapDelete(
    "/api/walkers/{id}",
    (int id) =>
    {
        Walker walker = walkers.FirstOrDefault(walker => walker.Id == id);

        if (walker == null)
        {
            return Results.BadRequest();
        }

        walkers.Remove(walker);

        return Results.Ok();
    }
);

app.Run();
