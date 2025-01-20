import React, { useState } from "react";

function Favorites() {
  const [cookTime, setCookTime] = useState("");
  const [calories, setCalories] = useState("");
  const [isVegan, setIsVegan] = useState(false);

  return (
    <main className="flex justify-center items-start min-h-screen bg-gray-100 py-10">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <section>
          <h1 className="text-2xl font-bold mb-4">My Favorite Recipes</h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Cooking time (min.)"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isVegan}
                onChange={() => setIsVegan(!isVegan)}
                className="mr-2"
              />
              Vegan
            </label>
          </div>
        </section>
        <section className="mt-8">
          <p>Here are going to render the favorite recipes...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim placeat dolores obcaecati beatae delectus labore officia ratione ullam, eligendi praesentium! At nostrum, sed sint eaque exercitationem alias optio maiores dolore.
          Exercitationem blanditiis dolorum deserunt, libero numquam tempora dignissimos ea culpa iste cupiditate nobis, commodi aspernatur expedita. Enim, laudantium! Labore magni velit, enim illo beatae commodi dicta voluptates distinctio praesentium. Atque.
          Voluptate, doloremque quo debitis mollitia corrupti eius, voluptatum consequatur consectetur rem assumenda quae, dicta nisi? Obcaecati autem cupiditate vitae labore beatae at iste laudantium, ipsam animi rerum facilis aliquid asperiores.
          Quod adipisci aliquid, aut numquam obcaecati aspernatur iste, dolores eaque recusandae suscipit, dolorum sapiente dolore eius dolorem atque! Cupiditate et eius quas laboriosam fugiat reprehenderit corrupti minus omnis sit consequatur!
          Quia delectus nisi excepturi possimus earum repudiandae dicta quasi! Ad impedit laboriosam sed, magnam provident autem odio veniam fuga eveniet rem nisi. Voluptates quis dicta ratione perspiciatis eaque perferendis omnis!
          Odit consequuntur excepturi corrupti distinctio ad veniam cupiditate aut sit eligendi id aperiam voluptatem quas eos voluptate sunt nam, in ratione adipisci minima facere beatae perspiciatis velit dolor nostrum. Aperiam.
          Repellendus quidem saepe debitis ratione quia sed amet natus, assumenda quisquam veniam pariatur facilis beatae nemo. Quod nobis aliquam sit eveniet omnis veritatis temporibus. Voluptate asperiores cumque adipisci id laborum.
          Expedita fuga placeat deleniti distinctio totam nesciunt natus, consectetur soluta labore harum. Dignissimos quibusdam animi magnam? Eaque accusamus quia sunt! Assumenda aspernatur repellat explicabo soluta accusamus minima amet, sapiente dicta!
          Itaque in totam quae consectetur libero rerum debitis earum quisquam, ipsa harum sunt dolor quaerat. Libero praesentium labore nihil quod adipisci debitis incidunt rem, nam cumque? Excepturi expedita ut nobis.
          Enim aspernatur, quas numquam hic expedita totam, ratione alias, illum repellendus quod perferendis quaerat voluptatem molestiae et suscipit necessitatibus incidunt doloribus minima voluptas esse assumenda voluptates repellat? Possimus, dolorem deserunt!</p>
        </section>

        <button
          onClick={() => {
            // Logic to navigate back to home
            window.location.href = "/home";
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}

export default Favorites;
