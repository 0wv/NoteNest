<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- sidebar -->
    <div class="bg-stone-950 w-[338px] p-8">
      <Logo />
      <!-- "Today" container -->
      <div>
        <p class="text-s font-bold text-[#C2C2C2] mt-12 mb-4">Today</p>
        <div class="ml-2">
          <div class="p-4 bg-[#A1842C] rounded-lg">
            <h3 class="text-sm font-bold text-[#F4F4F5]">
              Finally learnt how to code..
            </h3>
            <div class="leading-none">
              <span class="text-xs font-light text-[#F4F4F5] mr-24">Today</span>
              <span class="text-xs text-[#D6D6D6]">idfk man</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-sm font-bold text-[#F4F4F5]">
              this is a major cry for help..
            </h3>
            <div class="leading-none">
              <span class="text-xs font-light text-[#F4F4F5] mr-24">Today</span>
              <span class="text-xs text-[#D6D6D6]">idfk man</span>
            </div>
          </div>
        </div>
      </div>
      <!-- /"Today" container-->
      <!-- "Yesterday" container-->
      <div>
        <p class="text-s font-bold text-[#C2C2C2] mt-12 mb-2">Yesterday</p>
        <div class="ml-2">
          <div class="p-4">
            <h3 class="text-sm font-bold text-[#F4F4F5]">
              This nigga look like a sloth
            </h3>
            <div class="leading-none">
              <span class="text-xs text-[#F4F4F5] mr-24">Yesterday</span>
              <span class="text-xs text-[#D6D6D6]">idfk</span>
            </div>
          </div>
        </div>
      </div>
      <!-- "Yesterday" container-->
    </div>
    <!-- /sidebar -->
    <!-- right section-->
    <div class="w-full">
      <!-- Top Buttons-->
      <div class="w-full flex justify-between items-start p-8">
        <button
          class="inline-flex items-center text-sm text-[#C2C2C5] hover:text-white font-bold space-x-2"
        >
          <NewNote /><span>Create Note</span>
        </button>
        <button class="text-[#6D6D73] hover:text-white">
          <TrashCan />
        </button>
      </div>
      <!-- /Top Buttons-->
      <!-- Middle Text -->
      <div class="max-w-[437px] mx-auto">
        <!-- mx-auto adds margins left and right sides to make it in the middle? -->
        <p class="text-[#929292] font-playfair">November 22nd, 2024</p>
        <p class="text-[#D4D4D4] my-4 font-playfair">
          Finally moved into my tiny house today! After months of YouTube
          tutorials, countless trips to Home Depot, and more scrapes and bruises
          than I care to count, I'm officially a tiny home dweller. The sunset
          streaming through my handmade stained glass window makes the whole 240
          square feet glow like a jewel box. Still can't believe I built this
          with my own two hands (and Dad's power tools).
        </p>
        <p class="text-[#D4D4D4] my-4 font-playfair">
          Living small means getting creative with space. Today I installed my
          fold-down desk that transforms into a dining table - probably my
          proudest DIY achievement yet. The copper pipes and reclaimed wood give
          it this amazing steampunk vibe I wasn't even planning. Had my first
          meal on it tonight: takeout ramen and a victory beer, because after
          all that building, cooking was definitely not happening.
        </p>
        <p class="text-[#D4D4D4] my-4 font-playfair">
          My favorite spot is the reading nook by the window. I've got all my
          favorite books within arm's reach, arranged by color because why not?
          The cushions I sewed last weekend turned out surprisingly well,
          considering my last sewing project was a very lopsided pencil case in
          7th grade. The fairy lights make everything feel magical at night,
          like I'm living in some kind of woodland cottage rather than parked in
          my parents' backyard. Next project: figuring out how to grow herbs in
          vertical planters without blocking my only source of natural light!
        </p>
      </div>
      <!-- /Middle Text -->
    </div>
    <!-- /right section-->
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth"], // run whatever is in auth.js BEFORE we open index.vue
  });
</script>
