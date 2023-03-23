<script>
export default {
  name: 'SongItem',
  props: {
    song: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <router-link
        class="font-bold block text-gray-600"
        :to="{ name: 'Song', params: { songId: song.songId } }"
      >
        {{ song.modifiedName }}
      </router-link>
      <span class="text-gray-500 text-sm">
        {{ song.displayName }}
      </span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        :to="{ name: 'Song', params: { songId: song.songId }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <!-- receiving slot props -->
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.commentCount }}
        </span>
      </router-link>
    </div>
  </li>
</template>
