// vite.config.ts
import { defineConfig } from "file:///home/zihan/h/zenum/node_modules/.pnpm/vitest@0.28.5/node_modules/vitest/dist/config.js";
import AutoImport from "file:///home/zihan/h/zenum/node_modules/.pnpm/unplugin-auto-import@0.14.3/node_modules/unplugin-auto-import/dist/vite.js";
import Dts from "file:///home/zihan/h/zenum/node_modules/.pnpm/vite-plugin-dts@2.0.0-beta.0_rmcmjwf473jv2nzaie62h4xt54/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      fileName: "index"
    }
  },
  plugins: [
    AutoImport({
      dts: "./src/auto-imports.generated.d.ts",
      imports: ["vitest"]
    }),
    Dts()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS96aWhhbi9oL3plbnVtXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS96aWhhbi9oL3plbnVtL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3ppaGFuL2gvemVudW0vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXN0L2NvbmZpZ1wiXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiXG5pbXBvcnQgRHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRidWlsZDoge1xuXHRcdGxpYjoge1xuXHRcdFx0ZW50cnk6IFwiLi9zcmMvaW5kZXgudHNcIixcblx0XHRcdGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCJdLFxuXHRcdFx0ZmlsZU5hbWU6IFwiaW5kZXhcIixcblx0XHR9LFxuXHR9LFxuXHRwbHVnaW5zOiBbXG5cdFx0QXV0b0ltcG9ydCh7XG5cdFx0XHRkdHM6IFwiLi9zcmMvYXV0by1pbXBvcnRzLmdlbmVyYXRlZC5kLnRzXCIsXG5cdFx0XHRpbXBvcnRzOiBbXCJ2aXRlc3RcIl0sXG5cdFx0fSksXG5cdFx0RHRzKCksXG5cdF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyTyxTQUFTLG9CQUFvQjtBQUN4USxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFNBQVM7QUFFaEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsT0FBTztBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVU7QUFBQSxJQUNYO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsV0FBVztBQUFBLE1BQ1YsS0FBSztBQUFBLE1BQ0wsU0FBUyxDQUFDLFFBQVE7QUFBQSxJQUNuQixDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsRUFDTDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
