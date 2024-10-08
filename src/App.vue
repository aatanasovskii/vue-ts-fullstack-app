<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {remult} from "remult";
import {Task} from "@/shared/task";
import {TasksController} from "@/shared/TasksController";

const tasks = ref<Task[]>([])

const taskRepo = remult.repo(Task) // tells remult to return a repository of type Task. To get,post... data from the backend

onMounted(() =>
    onUnmounted(
        taskRepo.liveQuery({
          // where:{
          //   completed: false
          // },
          // page:2, // pagination is like this
          limit: 20,
          orderBy: {
            completed: "asc"
          }
        })
            .subscribe((info) => (tasks.value = info.applyChanges(tasks.value)))
    ))

const newTaskTitle = ref("");

async function addTask() {
  try {
    const newTask = await taskRepo.insert({title: newTaskTitle.value})
    newTaskTitle.value = ""
  } catch (error: unknown) {
    alert((error as { message: string }).message)
  }
}

async function saveTask(task: Task) {
  try {
    await taskRepo.save(task)
  } catch (error: unknown) {
    alert((error as { message: string }).message)
  }
}

async function deleteTask(task: Task) {
  try {
    await taskRepo.delete(task)
  } catch (error: unknown) {
    alert((error as { message: string }).message)
  }
}

async function setAllCompleted(completed: boolean) {
  await TasksController.setAllCompleted(completed)
}
</script>

<template>
  <h1>Todos</h1>
  <main>
    <form
        @submit.prevent="addTask()"
        v-if="taskRepo.metadata.apiInsertAllowed()"
    >
      <input v-model="newTaskTitle" placeholder="What needs to be done?"/>
      <button>Add</button>
    </form>

    <div v-for="task in tasks">
      <input type="checkbox" v-model="task.completed" @change="saveTask(task)">
      <input v-model="task.title">
      <button @click="saveTask(task)">Save</button>
      <button
          v-if="taskRepo.metadata.apiDeleteAllowed()"
          @click="deleteTask(task)"
      >Delete
      </button>
    </div>

    <div>
      <button @click="$event => setAllCompleted(true)">Set All Completed</button>
      <button @click="$event => setAllCompleted(false)">Set All UnCompleted</button>
    </div>
  </main>
</template>

<style scoped>
</style>
