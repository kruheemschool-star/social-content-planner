'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { articles, Category } from '@/data/articles';
import { ArrowUpRight, BookOpen, Heart, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories: Category[] = [
    'Student Motivation',
    'Exam Tactics',
    'Parent Corner',
    'Math in Real Life',
];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

    const filteredArticles =
        selectedCategory === 'All'
            ? articles
            : articles.filter((article) => article.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white py-20 sm:py-32">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Inspiration Hub</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                        เติมไฟ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">และไขข้อข้องใจ</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        พื้นที่ปลอดภัยสำหรับทุกคน ไม่ว่าจะมาหาเทคนิคการเรียน กำลังใจ หรือคำแนะนำดีๆ
                        เรามีเรื่องราวที่จะเปลี่ยน "ความยาก" ให้กลายเป็น "ความสนุก"
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-16">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                            selectedCategory === 'All'
                                ? "bg-gray-900 text-white shadow-lg scale-105"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        )}
                    >
                        All Stories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                selectedCategory === category
                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={article.coverImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-800 shadow-sm">
                                        {article.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="w-3 h-3" /> {article.readTime}
                                    </span>
                                    <span>•</span>
                                    <span>{article.publishDate}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold">
                                            {article.author.charAt(0)}
                                        </div>
                                        <span className="text-xs font-medium text-gray-700">{article.author}</span>
                                    </div>
                                    <span className="text-orange-500 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Read more <ArrowUpRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <Heart className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">No stories found</h3>
                        <p className="text-gray-500 mt-2">Try selecting a different category.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
