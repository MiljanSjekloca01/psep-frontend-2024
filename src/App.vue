<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AuthService,isAuthenticated } from './services/auth.service';
const router = useRouter()

function logout(){
  AuthService.clearAuth()
  router.push({ path: "/login" })
}

</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <i class="fa-solid fa-sheet-plastic"></i> PSEP
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isAuthenticated">
            <li class="nav-item"> <RouterLink class="nav-link" to="/customer">Customers</RouterLink> </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Other
              </a>
              <ul class="dropdown-menu">
                <li class="nav-item dropdown-item"> <RouterLink class="nav-link" to="/type">Types</RouterLink> </li>
                <li class="nav-item dropdown-item"> <RouterLink class="nav-link" to="/state">States</RouterLink> </li>
                <li class="nav-item dropdown-item"> <RouterLink class="nav-link" to="/manufacturer">Manufacturers</RouterLink> </li>
                <li class="nav-item dropdown-item"> <RouterLink class="nav-link" to="/model">Models</RouterLink> </li>
              </ul>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="logout()" type="button">Logout</button>
            </li>
            
          </ul>
          <span class="navbar-text" v-if="isAuthenticated">
          <i class="fa-solid fa-user"></i>&nbsp; {{ AuthService.getUsername() }}
          </span>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>
