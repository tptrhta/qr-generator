<template>
  <div>
    <el-skeleton :rows="5" animated v-if="isLoadingManagers" />
    <ul v-else>
      <li v-for="manager in managers" :key="manager.id">
        <el-card class="manager-card">
          <div class="manager-content">
            <el-avatar :size="50" :src="manager.photo" v-if="manager.photo" />
            <el-avatar :size="50" v-else>{{ manager.name.charAt(0) }}</el-avatar>
            <div class="manager-info">
              <span class="manager-name">{{ manager.name }}</span>
              <span class="manager-position">{{ manager.position }}</span>
              <span class="manager-phone">{{ manager.phone }}</span>
            </div>
            <el-button type="primary" @click="downloadSVG(manager)">Скачать QR-код</el-button>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useManagersStore } from '@/store/managers';

export default {
  setup() {
    const managersStore = useManagersStore();

    onMounted(() => {
      managersStore.getManagers();
    });

    const managers = computed(() => managersStore.managers);
    const isLoadingManagers = computed(() => managersStore.isLoadingManagers);

    return {
      managers,
      isLoadingManagers,
      downloadSVG: managersStore.downloadSVG,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.manager-card {
  width: 100%;
}

.manager-content {
  display: flex;
  align-items: center;
}

.manager-info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.manager-name {
  font-weight: bold;
}

.manager-position, .manager-phone {
  font-size: 0.9em;
  color: #666;
}

.el-button {
  margin-left: auto;
}
</style>