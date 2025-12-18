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
  // TEST 2: Verificar la imagen
  test('Debe renderizar la imagen con el src correcto', () => {
    const wrapper = mount(PokemonBoxComponent, {
      props: {
        name: 'squirtle',
        number: 7,
        img: 'https://img.com/7.png',
        to: '/pokemon/7'
      },
      global: { stubs: { RouterLink: true } }
    })

    const image = wrapper.find('img')
    // Comprobamos que el atributo 'src' de la imagen coincide con la prop 'img'
    expect(image.attributes('src')).toBe('https://img.com/7.png')
  })

  // TEST 3: Verificar el enlace (RouterLink)
  test('El enlace debe apuntar a la ruta correcta', () => {
    const wrapper = mount(PokemonBoxComponent, {
      props: {
        name: 'squirtle',
        number: 7,
        img: 'url',
        to: '/pokemon/7'
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a :href="$attrs.to"><slot /></a>'
          }
        }
      }
    })

    const link = wrapper.find('a')
    // Verificamos que el href del enlace sea el valor de la prop 'to'
    expect(link.attributes('href')).toBe('/pokemon/7')
  })

  // TEST 4: Accesibilidad (Atributo Alt)
  test('La imagen debe tener un atributo alt con el nombre del Pokémon', () => {
    const nameInput = 'squirtle'
    const wrapper = mount(PokemonBoxComponent, {
      props: {
        name: nameInput,
        number: 7,
        img: 'url',
        to: 'url'
      },
      global: { stubs: { RouterLink: true } }
    })

    const image = wrapper.find('img')
    // Es buena práctica que las imágenes tengan 'alt' para accesibilidad
    expect(image.attributes('alt')).toBe(nameInput)
  })

  // TEST 5: Verificar clases CSS
  test('El componente debe tener la clase CSS base', () => {
    const wrapper = mount(PokemonBoxComponent, {
      props: { name: 'n', number: 1, img: 'u', to: 't' },
      global: { stubs: { RouterLink: true } }
    })

    // Comprobamos que el elemento raíz tiene una clase esperada (ajusta 'pokemon-card' si usas otra)
    // Si no estás seguro de la clase, puedes usar wrapper.exists() o buscar un div
    expect(wrapper.classes()).toContain('pokemon-card') 
  })
})