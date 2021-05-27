const TurnaCard = () => {
    return(

        <div class="min-h-screen min-w-screen flex items-center justify-center">
        <div>
          <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 text-left">
            <img class="w-full rounded-md" src="https://editorial.uefa.com/resources/0265-115492e629a4-d74889fdd6e9-1000/euro_fixtures.jpg" alt="motivation" />
            <p class=" text-2xl leading-relaxed font-mono ">Euro 2021 Ennustusmäng</p>
            <button class="px-24 py-4 bg-gray-900 rounded-md text-white text-sm focus:border-transparent">Vaata</button>
          </div>
        </div>
      </div>
    );
}

export default TurnaCard