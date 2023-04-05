<script>
import { songsCollection, auth, commentsCollection } from '@/includes/firebase'
import { mapState, mapActions } from 'pinia'
import useUserStore from '@/stores/user'
import usePlayerStore from '@/stores/player'

export default {
  name: 'SongView',
  data() {
    return {
      song: {},
      commentInSubmit: false,
      commentShowAlert: false,
      commentAlertVariant: 'bg-blue-500',
      commentAlertMsg: 'Please wait, we are submitting your comment...',
      comments: [],
      sort: 'latest'
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn', 'isPlaying']),
    sortedComments() {
      // We use slice() to create a copy of the array so that we don't mutate the original array
      return this.comments.slice().sort((a, b) => {
        if (this.sort === 'latest') {
          return new Date(b.datePosted) - new Date(a.datePosted)
        } else {
          return new Date(a.datePosted) - new Date(b.datePosted)
        }
      })
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    async submitComment(values, context) {
      this.commentInSubmit = true
      this.commentShowAlert = true
      this.commentAlertVariant = 'bg-blue-500'
      this.commentAlertMsg = 'Please wait, we are submitting your comment...'

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        songId: this.$route.params.songId,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName
      }

      try {
        await commentsCollection.add(comment)
      } catch (error) {
        this.commentAlertVariant = 'bg-red-500'
        this.commentAlertMsg = error.message
        this.commentInSubmit = false
        return
      }

      await songsCollection.doc(this.$route.params.songId).update({
        commentCount: this.song.commentCount++
      })

      this.getComments()

      this.commentAlertVariant = 'bg-green-500'
      this.commentAlertMsg = 'Comment submitted!'
      this.commentInSubmit = false

      context.resetForm()
    },
    async getComments() {
      const comments = await commentsCollection
        .where('songId', '==', this.$route.params.songId)
        .get()

      this.comments = []

      comments.forEach((comment) => {
        this.comments.push({ ...comment.data(), commentId: comment.id })
      })
    }
  },

  // for performance we use beforeRouteEnter instead of created
  async beforeRouteEnter(to, from, next) {
    // since component is not yet created, we can't use "this.$route" here instead we use "to"
    const songId = to.params.songId
    const song = await songsCollection.doc(songId).get()

    next((vm) => {
      if (!song.exists) {
        vm.$router.push({ name: 'Home' })
        return
      }

      const { sort } = vm.$route.query

      if (sort === 'latest' || sort === 'oldest') {
        vm.sort = vm.$route.query.sort
      }

      vm.song = song.data()
      vm.getComments()
    })
  },
  watch: {
    sort(newValue) {
      if (newValue === this.$route.query.sort) return

      this.$router.push({
        query: { sort: newValue }
      })
    }
  }
}
</script>

<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="newSong(song)"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">
            {{ song.modifiedName }}
          </div>
          <div>
            {{ song.genre }}
          </div>
          <div class="song-price">
            {{ $n(1, 'currency', 'ja') }}
          </div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            {{ $tc('song.commentCount', song.commentCount, { count: song.commentCount }) }}
          </span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 rounded mb-4"
            v-if="commentShowAlert"
            :class="commentAlertVariant"
          >
            {{ commentAlertMsg }}
          </div>
          <vee-form @submit="submitComment" v-if="userLoggedIn">
            <vee-field
              as="textarea"
              name="comment"
              rules="required|min:3"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <vee-error-message class="text-red-600" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="commentInSubmit"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            v-model="sort"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.commentId"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <div class="mb-5">
          <div class="font-bold">
            {{ comment.userName }}
          </div>
          <time>
            {{ comment.datePosted }}
          </time>
        </div>
        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>
