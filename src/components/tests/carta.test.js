// src/components/tests/carta.test.js

import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

// Importamos el componente que vamos a probar.
// Usamos '../' porque el test está dentro de 'tests/' y el componente está fuera.
import PokemonBoxComponent from '../pokemonBoxComponent.vue' 

describe('Probando el componente de la tarjeta de Pokémon', () => {
  test('Verificar que el nombre y el número se muestran juntos correctamente', () => {
    
    // 1. Simular la creación del componente (Montar).
    // Le pasamos las 'props' (propiedades) que necesita para funcionar.
    const wrapper = mount(PokemonBoxComponent, {
      props: {
        name: 'squirtle',
        number: 7, // El ID o número de la Pokédex.
        img: 'url_simulada', // URL de imagen, aunque no la verificamos ahora.
        to: '/pokemon/7' // La ruta a la que debe navegar.
      },
      
      // 2. SOLUCIÓN AL ERROR DE ROUTER: 
      // RouterLink es una dependencia externa. La 'simulamos' (stub)
      // para que Vitest no intente cargarla de verdad y el test no falle.
      global: {
        stubs: {
          RouterLink: {
            // Decimos a Vitest que RouterLink es solo una etiqueta <a> con su 'to' como 'href'.
            template: '<a :href="$attrs.to"><slot /></a>'
          }
        }
      }
    })

    // 3. PRUEBA PRINCIPAL: Comprobamos el texto visible (el span).
    // El componente une el número y el nombre: "7 squirtle"
    const textSpan = wrapper.find('span');
    expect(textSpan.text()).toBe('7 squirtle') 

    // 4. PRUEBA DE EXISTENCIA: Verificación mínima de que se ha cargado.
    expect(wrapper.exists()).toBe(true) 
  })
})