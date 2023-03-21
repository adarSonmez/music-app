<script>
import useUserStore from '@/stores/user'
import UploadSong from '@/components/UploadSong.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { auth, songsCollection } from '@/includes/firebase'

export default {
  name: 'ManageView',
  data() {
    return {
      songs: [],
      unsavedFlag: false
    }
  },
  components: {
    UploadSong,
    CompositionItem
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modifiedName = values.modifiedName
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(song) {
      this.songs.push(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  async created() {
    const snapshot = await songsCollection.where('userId', '==', auth.currentUser.uid).get()
    this.songs = snapshot.docs.map((doc) => {
      return { songId: doc.id, ...doc.data() }
    })
  },
  beforeRouteEnter(to, from, next) {
    // We call userStore as a function because beforeRouteEnter is called before the component and its stores are created
    const userStore = useUserStore()
    if (userStore.userLoggedIn) next()
    else next({ name: 'Home' })
  },
  beforeRouteLeave(to, from, next) {
    // don't use refs frequently, because vue developer tools will not be able to track them
    this.$refs.upload.cancelUploads()

    if (this.unsavedFlag) {
      const answer = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(answer)
    } else next()
  }
}
</script>

<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-song ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.songId"
              :song="song"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :index="i"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
