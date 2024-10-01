// countdown.js
class Countdown {
    constructor(duration, onUpdate, onComplete) {
        this.initialDuration = duration; // Duración inicial (en segundos)
        this.remainingTime = duration;   // Tiempo restante
        this.onUpdate = onUpdate;        // Función a ejecutar en cada actualización
        this.onComplete = onComplete;    // Función a ejecutar cuando la cuenta llega a 0
        this.intervalId = null;          // ID del intervalo
    }

    // Método para iniciar la cuenta atrás
    start() {
        if (this.intervalId) return; // Prevenir múltiples intervalos

        this.intervalId = setInterval(() => {
            this.remainingTime -= 1;  // Decrementar el tiempo restante

            // Ejecutar la función de actualización si existe
            if (this.onUpdate) {
                this.onUpdate(this.remainingTime);
            }

            // Cuando el tiempo llegue a cero, parar el contador y ejecutar onComplete
            if (this.remainingTime <= 0) {
                this.stop();
                if (this.onComplete) {
                    this.onComplete();
                }
            }
        }, 1000); // Actualiza cada segundo
    }

    // Método para detener la cuenta atrás
    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    // Método para reiniciar la cuenta atrás
    reset(newDuration = this.initialDuration) {
        this.stop();  // Detiene cualquier cuenta atrás en curso
        this.remainingTime = newDuration; // Reinicia el tiempo
        this.start(); // Inicia de nuevo
    }

    // Método para ajustar la duración
    setDuration(newDuration) {
        this.initialDuration = newDuration;
        this.reset(newDuration); // Reiniciar la cuenta atrás con la nueva duración
    }
}

export default Countdown;
