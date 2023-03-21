<script>
import { songsCollection, storage } from '@/includes/firebase'

export default {
  name: 'CompositionItem',
  data() {
    return {
      isEditing: false,
      inSubmit: false,
      showAlert: false,
      alertVariant: 'bg-blue-500',
      alertMessage: 'Please wait! Updating song info...'
    }
  },
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    updateUnsavedFlag: {
      type: Function,
      required: true
    }
  },
  methods: {
    async edit(values) {
      this.inSubmit = true
      this.showAlert = true
      this.alertVariant = 'bg-blue-500'
      this.alertMessage = 'Please wait! Updating song info...'

      try {
        await songsCollection.doc(this.song.songId).update(values)
      } catch (error) {
        this.alertVariant = 'bg-red-500'
        this.alertMessage = error.message
        this.inSubmit = false
        return
      }

      this.updateSong(this.index, values)
      this.updateUnsavedFlag(false)

      this.alertVariant = 'bg-green-500'
      this.alertMessage = 'Song info updated!'
      this.inSubmit = false
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child('songs/' + this.song.originalName)

      try {
        await songRef.delete()
      } catch (error) {
        console.log(error)
      } finally {
        await songsCollection.doc(this.song.songId).delete()
        this.removeSong(this.index)
      }
    }
  }
}
</script>

<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!isEditing">
      <h4 class="inline-block text-xl font-bold">
        {{ song.modifiedName }}
      </h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click="isEditing = true"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="isEditing">
      <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        v-if="showAlert"
        :class="alertVariant"
      >
        {{ alertMessage }}
      </div>
      <vee-form :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modifiedName"
            as="input"
            rules="required|min:3|max:200"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <vee-error-message name="modifiedSongTitle" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            as="input"
            rules="alpha_spaces"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <vee-error-message name="genre" class="text-red-600" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="inSubmit"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="inSubmit"
          @click.prevent="isEditing = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>
