<template>
    <main>
        <div id="app" @dragover.prevent @drop.prevent>
            <div class="mx-4 border-2 rounded-xl overflow-hidden" @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop" > <!--v-bind:style="{ 'background-color': color }"-->
                <div class="w-fill h-fill bg-blue-100 hover:bg-gray-100 file-wrapper">
                    <input type="file" name="file-input" multiple="True" @change="handleFileInput">
                </div>
            </div>
        </div>
        <ul id="selected-files" class="mt-2">
            <li v-for="file in files" :key="file.name">
                <div class="mx-4 border-2 hover:bg-blue-100">
                {{ file.name }} ({{ file.size }} b)
                {{ file.message }}
                <button @click="removeFile(index)" title="Remove" class="rounded-xl bg-blue-300 border-2 h-12 px-4">Remove</button>
                </div>
            </li>
        </ul>

        <ul id="download-files" class="mt-2">
            <li v-for="file in downloads" :key="file.name">
                <div class="mx-4 border-2 hover:bg-blue-100">
                    {{ file.filename }}
                    <button @click="downloadFile(file.link)" title="Download" class="rounded-xl bg-blue-300 border-2 h-12 px-4">Download</button>
                </div>
            </li>
        </ul>

        <button @click="upload" class="mt-2 rounded-xl bg-blue-300 border-2 w-40 h-12">Upload</button>
    </main>
</template>



<style scoped>

.file-wrapper {
  text-align: center;
  /*width: 300px;
  height: 5em;*/
  vertical-align: middle;
  display: table-cell;
  position: relative;
  overflow: hidden;
  /*background: gray;*/ /* and other things to make it pretty */
}


.file-wrapper input {
   
    cursor: pointer;
    opacity: 0.0;
    filter: alpha(opacity=0); /* and all the other old opacity stuff you
                                 want to support */
    font-size: 300px; /* wtf, but apparently the most reliable way to make
                         a large part of the input clickable in most browsers */
    height: 200px;
}

</style>