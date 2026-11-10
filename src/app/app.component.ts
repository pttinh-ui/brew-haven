import { Component, HostListener, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

type Category = 'All' | 'Coffee' | 'Tea' | 'Pastry';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, 'All'>;
  tag?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly navLinks = [
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'visit', label: 'Visit' },
  ];

  readonly categories: Category[] = ['All', 'Coffee', 'Tea', 'Pastry'];

  readonly menu: MenuItem[] = [
    { name: 'Signature Latte', description: 'Double espresso, steamed milk, house caramel', price: 4.5, category: 'Coffee', tag: 'Best seller' },
    { name: 'Coconut Cold Brew', description: '18-hour cold brew topped with coconut cream', price: 5, category: 'Coffee', tag: 'New' },
    { name: 'Salted Egg Coffee', description: 'Robusta shot under a silky whipped egg foam', price: 4.8, category: 'Coffee' },
    { name: 'Flat White', description: 'Ristretto with velvety micro-foam', price: 4, category: 'Coffee' },
    { name: 'Lotus Jasmine Tea', description: 'Hand-scented green tea, served hot or iced', price: 3.5, category: 'Tea' },
    { name: 'Peach Oolong', description: 'Roasted oolong, fresh peach, lemongrass', price: 4.2, category: 'Tea', tag: 'Seasonal' },
    { name: 'Butter Croissant', description: 'Baked every morning with French butter', price: 3, category: 'Pastry' },
    { name: 'Banana Bread', description: 'Moist, warm, with a crunchy walnut top', price: 3.2, category: 'Pastry' },
  ];

  readonly reviews = [
    { name: 'Emily R.', text: 'The coconut cold brew is unreal. Perfect spot to work for a few hours.', rating: 5 },
    { name: 'Minh T.', text: 'Cozy vibe, friendly baristas and the best egg coffee in town.', rating: 5 },
    { name: 'Daniel K.', text: 'Great pastries, fast Wi-Fi and plenty of power outlets.', rating: 4 },
  ];

  readonly activeCategory = signal<Category>('All');
  readonly filteredMenu = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.menu : this.menu.filter((m) => m.category === cat);
  });

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly submitted = signal(false);
  readonly year = new Date().getFullYear();
  readonly today = new Date().toISOString().split('T')[0];

  readonly form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      guests: [2, [Validators.required, Validators.min(1), Validators.max(12)]],
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  setCategory(cat: Category): void {
    this.activeCategory.set(cat);
  }

  scrollTo(id: string): void {
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  stars(n: number): number[] {
    return Array.from({ length: n });
  }

  invalid(control: 'name' | 'email' | 'date' | 'guests'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
    this.form.reset({ name: '', email: '', date: '', guests: 2 });
  }
}
