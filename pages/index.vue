<template>
  <div class="bg-zinc-900 flex h-screen">
    <!-- sidebar -->
    <div
      class="bg-stone-950 w-[338px] p-8 flex flex-col overflow-scroll overflow-x-hidden"
    >
      <div>
        <Logo />
      </div>
      <!-- "Today" container -->
      <div class="flex-grow">
        <p class="text-s font-medium text-[#C2C2C2] mt-12 mb-4">Today</p>
        <div class="ml-2 space-y-2 font-golos">
          <div
            v-for="note in todaysNotes"
            class="p-4 rounded-lg cursor-pointer"
            :class="{
              'bg-[#A1842C]': note.id === selectedNote.id,
              'hover:bg-[#A1842C]/50': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#F4F4F5]">
              <span class="text-xs font-light text-[#F4F4F5] mr-24">{{
                new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]"
                >...{{ note.text.substring(50, 70) }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- /"Today" container-->
      <!-- "Yesterday" container-->
      <div>
        <p class="text-s font-medium text-[#C2C2C2] mt-12 mb-2">Yesterday</p>
        <div class="ml-2 space-y-2">
          <div
            v-for="note in yesterdaysNotes"
            class="p-4 rounded-lg cursor-pointer"
            :class="{
              'bg-[#A1842C]': note.id === selectedNote.id,
              'hover:bg-[#A1842C]/50': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#F4F4F5]">
              <span class="text-xs font-light text-[#F4F4F5] mr-24">{{
                new Date(note.updatedAt).toDateString() ===
                new Date().toDateString()
                  ? "Today"
                  : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]"
                >...{{ note.text.substring(50, 70) }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- "Yesterday" container-->
      <!-- "Everything before yesterday" container-->
      <div>
        <p class="text-s font-medium text-[#C2C2C2] mt-12 mb-2">Earlier</p>
        <div class="ml-2 space-y-2">
          <div
            v-for="note in earlierNotes"
            class="p-4 rounded-lg cursor-pointer"
            :class="{
              'bg-[#A1842C]': note.id === selectedNote.id,
              'hover:bg-[#A1842C]/50': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#F4F4F5]">
              <span class="text-xs font-light text-[#F4F4F5] mr-24">{{
                new Date(note.updatedAt).toDateString() ===
                new Date().toDateString()
                  ? "Today"
                  : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]"
                >...{{ note.text.substring(50, 70) }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- /"Everything before yesterday" container-->
    </div>
    <!-- /sidebar -->
    <!-- right section-->
    <div class="bg-design w-full flex flex-col">
      <!-- Top Buttons-->
      <div class="w-full flex justify-between items-start p-8">
        <button
          class="inline-flex items-center text-sm text-[#C2C2C5] hover:text-white font-bold space-x-2"
        >
          <NewNote /><span class="cursor-pointer" @click="createNewNote"
            >Create Note</span
          >
        </button>
        <button class="text-[#C2C2C5] hover:text-white">
          <TrashCan class="cursor-pointer" />
        </button>
      </div>
      <!-- /Top Buttons-->
      <!-- Middle Text -->
      <div class="max-w-[437px] mx-auto w-full flex-grow flex flex-col">
        <!-- mx-auto adds margins left and right sides to make it in the middle? -->
        <p class="text-[#929292] font-playfair text-2xl">
          {{ new Date(selectedNote.updatedAt).toLocaleDateString() }}
        </p>
        <textarea
          ref="textarea"
          v-model="updatedNote"
          name="note"
          id="note"
          class="text-[#D4D4D4] my-4 font-golos text-1xl w-full bg-transparent focus:outline-none resize-none flex-grow"
          @input="
            () => {
              debouncedFn();
              selectedNote.text = updatedNote;
            }
          "
        ></textarea>
      </div>

      <button
        class="text-zinc-400 hover:text-white text-sm font-bold absolute right-0 bottom-0 mr-8 mb-8 cursor-pointer"
        @click="logout"
      >
        Logout
      </button>
      <!-- /Note Text -->
    </div>
    <!-- /right section-->
  </div>
</template>

<script setup>
  const updatedNote = ref("");
  const notes = ref([]);
  const selectedNote = ref({});
  const textarea = ref(null);

  definePageMeta({
    middleware: ["auth"], // run whatever is in auth.js BEFORE we open index.vue
  });

  function setNote(note) {
    selectedNote.value = note;
    updatedNote.value = note.text;
  }

  function logout() {
    const jwtCookie = useCookie("NoteNestJWT");
    jwtCookie.value = null;

    navigateTo("/login");
    console.log(jwtCookie.value);
  }

  async function createNewNote() {
    try {
      const newNote = await $fetch(`/api/notes`, {
        method: "POST",
      });

      notes.value.unshift(newNote);

      selectedNote.value = notes.value[0];
      updatedNote.value = "";
      textarea.value.focus();
    } catch (err) {
      console.log(err);
    }
  }

  const debouncedFn = useDebounceFn(async () => {
    await updateNote();
  }, 500); // complete all actions within 500 ms

  async function updateNote() {
    try {
      await $fetch(`/api/notes/${selectedNote.value.id}`, {
        method: "PATCH",
        body: {
          updatedNote: updatedNote.value,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  const todaysNotes = computed(() => {
    return notes.value.filter((note) => {
      const noteDate = new Date(note.updatedAt);
      return noteDate.toDateString() === new Date().toDateString();
    });
  });
  const yesterdaysNotes = computed(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return notes.value.filter((note) => {
      const noteDate = new Date(note.updatedAt);
      return noteDate.toDateString() === yesterday.toDateString();
    });
  });

  const earlierNotes = computed(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return notes.value.filter((note) => {
      const noteDate = new Date(note.updatedAt);
      return (
        noteDate < yesterday &&
        noteDate.toDateString() !== yesterday.toDateString()
      );
    });
  });

  onMounted(async () => {
    // when page is fully rendered, run a fetch for all notes
    notes.value = await $fetch("/api/notes");

    notes.value.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    if (notes.value.length > 0) {
      selectedNote.value = notes.value[0];
    } else {
      await createNewNote();
      selectedNote.value = notes.value[0];
    }

    updatedNote.value = selectedNote.value.text;

    textarea.value.focus();
  });
</script>
