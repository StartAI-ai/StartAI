class ApiService {
  constructor() {
    this.eventSource = null;
    this.dataSubject = new Subject();
    this.observable = this.dataSubject.asObservable();
    this.isConnected = false; // Track if the connection has been established
  }

  // Provide access to the observable
  observable() {
    return this.observable;
  }

  // Get Blink Data and establish connection if not already connected
  getBlinkData(api) {
    if (!this.isConnected) {
      this.createEventSource(api);
    }
    return this.observable;
  }

  // Create EventSource and set up event handlers
  createEventSource(api) {
    this.eventSource = new EventSource(api);

    this.eventSource.onmessage = (event) => {
      this.dataSubject.next(JSON.parse(event.data));
    };

    this.eventSource.onerror = (error) => {
      this.dataSubject.error(error);
      this.closeConnection();
    };

    this.isConnected = true; // Update connection status
  }

  // Close EventSource and reset connection status
  closeConnection() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.isConnected = false; // Reset connection status
    }
  }
}

// Implementação do Subject e Observable
class Subject {
  constructor() {
    this.observers = [];
  }

  next(data) {
    this.observers.forEach(observer => observer(data));
  }

  error(error) {
    this.observers.forEach(observer => observer(error));
  }

  asObservable() {
    return {
      subscribe: (observer) => {
        this.observers.push(observer);
      }
    };
  }
}

// Exportar uma instância do serviço
const apiService = new ApiService();
export default apiService;
