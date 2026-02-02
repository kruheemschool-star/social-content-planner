import { articles } from '@/data/articles';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: `${article.title} | Inspiration Hub`,
        description: article.excerpt,
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    // Find related articles (same category, excluding current)
    const relatedArticles = articles
        .filter((a) => a.category === article.category && a.slug !== article.slug)
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        href="/blog"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Ideas</span>
                    </Link>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <article className="container mx-auto px-4 max-w-4xl pt-10">
                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold mb-6">
                        {article.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        {article.title}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500 border-t border-b border-gray-100 py-4 max-w-xl mx-auto">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{article.publishDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg mb-12">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Article Content */}
                    <div className="lg:col-span-8 lg:col-start-3">
                        <div
                            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 
              prose-p:text-gray-600 prose-p:leading-8
              prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-li:text-gray-600 prose-li:leading-7"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        <hr className="my-12 border-gray-100" />

                        {/* Author Bio (Simple) */}
                        <div className="bg-gray-50 rounded-2xl p-8 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-2xl font-bold shrink-0">
                                {article.author.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Written by {article.author}</h4>
                                <p className="text-gray-600 mt-1">
                                    Passionate about making education accessible and fun for everyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="bg-gray-50 mt-20 py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedArticles.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/blog/${related.slug}`}
                                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex h-full">
                                        <div className="relative w-1/3 min-h-[120px]">
                                            <Image
                                                src={related.coverImage}
                                                alt={related.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4 w-2/3 flex flex-col justify-center">
                                            <span className="text-xs font-semibold text-orange-600 mb-2">{related.category}</span>
                                            <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                                                {related.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
